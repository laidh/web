import {useEffect, useState} from 'react'

import './styles.scss'
import {Card} from '../../components'
import { Button } from '../../components'
import { Build_upCard } from '../../components';
import JV from '../../assets/img/jv.png'
import threePlusOne from '../../assets/img/threePlusOne.png'
import jeveler from '../../assets/img/jeveler.png'
import pairPendant from '../../assets/img/PairPendant.png'
import diamond from '../../assets/img/diamond.png'
import kolo from '../../assets/img/kolo.png'
import ls3 from '../../assets/img/ls3.png'

const cardsData = [
    {
        id: 1,
        image: threePlusOne,
        title: 'Акція 3+1!',
        desc: 'Замовляй 3 камінчики та отримай 4-тий в подарунок!',
    },
    {
        id: 2,
        image: jeveler,
        title: 'Ремонт',
        desc: 'У нас найкращі і найдосвідченіші фахівці. При покупці у нас ремонт на 30% дешевше',
    },
    {
        id: 3,
        image: pairPendant,
        title: 'Парні куони',
        desc: 'Замовляй кулон для свого любимого і на другий отримуй знижку!',
    },
    {
        id: 4,
        image: diamond,
        title: 'Нова колекція діамантів',
        desc: 'У нас два нових різновиди діамантів. купи один і на другий знижка.',
    },
    {
        id: 5,
        image: ls3,
        title: 'Робимо вироби на замовлення',
        desc: 'Наші майстри врахують всі ваші побажання і зроблять для вас індевідуальну річ.',
    },
    {
        id: 6,
        image: kolo,
        title: 'Нова колекція перстнів',
        desc: 'Купуй один і маєш шанс поговорити з майстром.',
    },

];

const Home = () => {
    const [from, setFrom] = useState(0);
    const [cards, setCards] = useState([])
    const perPage = 3;
    const lastPage = 6;

    const getCards = () => {
        const to = from === 0 ? perPage : perPage+from
        const fetchedData = cardsData.slice(from, to);
        setCards([...cards, ...fetchedData]);
        setFrom(perPage+from);
    }

    const loadMore = () => {
        console.log('load - more');
        getCards();
    }

    useEffect(() => {
        getCards();
    }, [])

    return (
        <div>
           <div className="row">
               <div className="col">
                   <Build_upCard
                       image={JV}
                   />
               </div>
           </div>
           <div className="row justify-content-between">
               {cards.map(item => {
                   return (
                       <div key={item.id} className="col-4">
                           <Card
                               image={item.image}
                               title={item.title}
                               desc={item.desc}
                           />
                       </div>
                   )
               })}
           </div>
            {
                from < lastPage ? (
                    <div className="button-wrapper">
                        <Button text="View more" handleClick={loadMore}/>
                    </div>
                ) : null
            }
        </div>
    );
};

export default Home;