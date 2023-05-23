import Pagina from '@/components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BiCheckSquare, BiCaretLeft } from 'react-icons/bi'

const form = () => {

    const { push, query } = useRouter()
    const [curso, setCurso] = useState({})
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {

      if(query.id){
        const id = query.id
        const cursos = JSON.parse(window.localStorage.getItem('cursos')) || []
        const curso = cursos[id]


        for(let atributo in curso){
            setValue(atributo, curso[atributo])
        }
      }
    }, [query.id])

    function salvar(dados) { // salvar dados no localstorage 
        const cursos = JSON.parse(window.localStorage.getItem('cursos')) || []// tirar de uma string 
        cursos.push(dados)
        window.localStorage.setItem('cursos', JSON.stringify(cursos))//transformar em uma string
        push('/cursos')
    }

    return (
        <Pagina titulo='Forms'>


            <Form>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control type="text" {...register('nome')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="duracao">
                    <Form.Label>Duração:</Form.Label>
                    <Form.Control type="text" {...register('duracao')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="modalidade">
                    <Form.Label>Modalidade:</Form.Label>
                    <Form.Control type="text" {...register('modalidade')} />
                </Form.Group>

                <div className='text-center'>

                    <Button variant="success" onClick={handleSubmit(salvar)} >
                       <BiCheckSquare/> Salvar
                    </Button>

                    <Link href={'/cursos'} className='ms-2 btn btn-danger'>
                        <BiCaretLeft/> Voltar
                    </Link>
                </div>

            </Form>
        </Pagina>
    )
}

export default form