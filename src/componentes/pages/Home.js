import styles from './Home.module.css';
import savings from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';
function Home(){
    const link = "https://www.youtube.com/watch?v=FXqX7oof0I4&list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&pp=iAQB"
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            
            <img src={savings} alt="Costs"/>
            <hr className={styles.hr}/>
            <p  className={styles.text}>Comece a gerenciar os seus projetos agora mesmo e tenha o controle total sobre seus custos. O propósito do projeto é simplificar o monitoramento financeiro das suas iniciativas, fornecendo uma visão clara dos gastos associados a cada projeto.</p>

            <h2>Recursos Principais:</h2>
            <ul>
                <li><span>Acompanhamento de Custos: </span>
                Mantenha-se informado sobre todos os gastos relacionados aos seus projetos. Registre e categorize cada despesa para uma gestão financeira precisa.</li>
                <li><span>Serviços Adicionais: </span>
                Identifique os serviços extras que estão impactando seus custos. Descreva cada serviço adicionado para um entendimento detalhado do que está sendo investido.</li>
                <li><span>Integração com API Personalizada: </span>
                Utilizamos uma API exclusiva, criada internamente, para garantir uma integração perfeita e dados atualizados em tempo real.</li>
                <li><span>Layout Desenvolvido com Qualidade: </span>
                Nosso layout foi desenvolvido com base no curso gratuito do <a href={link} target='_blank'>&lt; Matheus Battisti - Hora de Codar &gt;</a> Aproveite uma interface amigável e intuitiva para facilitar a navegação e o gerenciamento dos seus projetos.</li>
            </ul>
            <div>
                <p>Este projeto não é apenas uma ferramenta de gestão de custos;<br/> é uma oportunidade para aprimorar suas habilidades como desenvolvedor.</p>
            </div>

        </section>
    )
}

export default Home;