import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmited = useCallback( async (data: SignUpFormData) => {
    try {

      formRef.current?.setErrors({});

       const schema = Yup.object().shape({
         name: Yup.string().required('Nome Obrigatório'),
         email: Yup.string().required('E-mail obrigatório').email('Digite um E-mail Válido'),
         password: Yup.string().min(6, 'Senha Deve Conter no Minimo 6 Digitos'),
       });

       await schema.validate(data, {
         abortEarly: false,
       });

       await api.post('/users', data);

       history.push('/');

       addToast({
         type: 'sucess',
         title: 'Cadastro Realizado!',
         description: 'Você já pode fazer seu Logon'
       })


    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      // disparar toasts
      addToast({
        type: 'error',
        title: 'Erro No Cadastro',
        description: 'Ocorreu um Erro ao Realizar Cadastro, tente novamente.',
      });
    }
  }, [addToast, history]);

  return (
  <Container>
    <Background />
    <Content>
      <AnimationContainer>
      <img src={logo} alt="GoBarber"/>

      <Form ref={formRef} onSubmit={handleSubmited}>
        <h1>Faça seu Cadastro</h1>

        <Input name="name" icon={FiUser} placeholder="Nome"/>
        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input  name="password" icon={FiLock} type="password" placeholder="Password"/>

        <Button type="submit">Cadastrar</Button>


      </Form>

      <Link to="/">
        <FiArrowLeft />
        Voltar Para Logon</Link>
        </AnimationContainer>
    </Content>
  </Container>

);
}


export default SignUp;
