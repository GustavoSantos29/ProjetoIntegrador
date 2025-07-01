import React from 'react';
import HeaderAdmin from '../../components/AdminHeader/HeaderAdmin';
import '../AnimalPages/CreatePage/style.css';
import FooterAdmin from '../../components/AdminFooter/FooterAdim';
import Carousel from '../../components/Carousel/Carousel';
import AnimalSearch from '../../components/AnimalSearch/AnimalSearch';
import './style.css'
const HomePage = () => {
    return (
        <div className='page-container'>
            <HeaderAdmin />
            <div className='page-content home-main'>
                <a href='/login' className='login'>Entrar como administrador</a>
                <Carousel />

                <hr />

                <div className='home-text-display'>
                    <h1 className='home-title'>Oquê é taxidermia</h1>
                    <p>
                        A taxidermia é a arte de preservar animais mortos com o objetivo de expor
                        sua aparência de forma realista. Por meio de técnicas que envolvem a remoção
                        e conservação da pele, o uso de moldes e o cuidado com os detalhes
                        anatômicos, essa prática permite recriar poses naturais dos animais, muitas
                        vezes utilizados em museus, instituições de pesquisa e até coleções
                        particulares. Além de ter valor estético, a taxidermia também possui uma
                        função educativa e científica, ajudando a manter registros visuais de
                        espécies, inclusive algumas já extintas.
                    </p>
                    <p>
                        Apesar de ser uma prática antiga, a taxidermia continua evoluindo com novos
                        materiais e métodos que oferecem maior realismo e durabilidade. Ela pode ser
                        considerada uma forma de arte, exigindo sensibilidade, conhecimento
                        anatômico e técnicas precisas para obter resultados que respeitem a
                        integridade visual do animal. Embora ainda haja debate sobre questões
                        éticas, quando realizada com responsabilidade — como em casos de animais que
                        morreram por causas naturais — a taxidermia pode contribuir
                        significativamente para o estudo da biodiversidade e a valorização da fauna.
                    </p>
                    <p>
                        A taxidermia tem suas raízes em práticas antigas de preservação, mas ganhou
                        destaque durante os séculos XVIII e XIX com a popularização das coleções
                        naturalistas. Naquela época, exploradores e cientistas utilizavam a técnica
                        para documentar espécies descobertas em expedições, tornando possível o
                        estudo e a exibição de animais exóticos para o público europeu. Hoje, ela
                        ainda cumpre esse papel em museus de história natural, onde contribui para a
                        educação ambiental e a conscientização sobre a preservação de espécies
                        ameaçadas.
                    </p>
                    <p>
                        Além de seu uso científico e educacional, a taxidermia também encontra
                        espaço em contextos culturais e artísticos. Alguns artistas contemporâneos
                        utilizam a técnica como forma de expressão, explorando temas como a vida, a
                        morte e a relação entre o ser humano e a natureza. Há ainda aqueles que veem
                        na taxidermia uma maneira de homenagear um animal de estimação falecido.
                        Seja no campo da ciência, da arte ou da memória afetiva, a taxidermia
                        continua a despertar interesse e admiração por sua complexidade e
                        significado simbólico.
                    </p>
                </div>
                <AnimalSearch />
            </div>

            <FooterAdmin />
        </div>
    );
};

export default HomePage;
