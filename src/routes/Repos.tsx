import { RepoProps } from "../types/Repo"

import { useState, useEffect } from "react" // usestate para salvar os dados, useeffect para regatar os dados por meio da API
import { useParams } from "react-router-dom" // para pegar o parametro do nome do usuario pela a url
import Loader from "../components/Loader"

import BackBtn from "../components/BackBtn"
import classe from './Repos.module.css'
import Repo from "../components/Repo"



const Repos = () => {
    const {username} = useParams()

    const [repos, setRepos] = useState<RepoProps[] | [] | null>(null)

    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {

        const loadRepos = async function (username: string) {
            setisLoading(true)
            const res = await fetch(`https://api.github.com/users/${username}/repos`)

            const data = await res.json()

            setisLoading(false)

            setRepos(data)
        }

        if(username) {
            loadRepos(username)
        }
    }, [])

    if(!repos && isLoading) return <Loader />

  return (
    <div>
        <BackBtn />
        <h2>Explore os Repositórios do usuario: {username}</h2>
        {repos && repos.length === 0 && <p>Não há repositorios</p>}
        {repos && repos.length > 0 &&(
            <div>
                {repos.map((repo: RepoProps) => (
                   <Repo key={repo.name} {...repo}/>
                ))}
            </div>
        )}
    </div>
  )
}

export default Repos