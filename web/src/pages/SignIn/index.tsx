import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmited = useCallback( async (data: SignInFormData) => {
    try {

      formRef.current?.setErrors({});

       const schema = Yup.object().shape({
         email: Yup.string().required('E-mail obrigatório').email('Digite um E-mail Válido'),
         password: Yup.string().min(6, 'Senha Obrigatória'),
       });

       await schema.validate(data, {
         abortEarly: false,
       });

       await signIn({
         email: data.email,
         password: data.password,
       });

       history.push('/dashboard')
    }catch(err){

      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      // disparar toasts
      addToast({
        type: 'error',
        title: 'Erro Na Autenticação',
        description: 'Ocorreu um Erro ao Realizar Login, Cheque as credenciais.',
      });

    }
  }, [signIn, addToast, history]);


  return (
  <Container>
    <Content>
      <AnimationContainer>
      <img src={logo} alt="GoBarber"/>

      <Form ref={formRef} onSubmit={handleSubmited}>
        <h1>Faça seu Logon</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input  name="password" icon={FiLock} type="password" placeholder="Password"/>

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </Form>

      <Link to="/signup">
        <FiLogIn />
        Criar Conta
      </Link>

        </AnimationContainer>
    </Content>


    <Background />
  </Container>
  )}
;

export default SignIn;