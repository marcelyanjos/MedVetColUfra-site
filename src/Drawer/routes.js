import React from 'react'
import Home from '../pages/home'
import About from "../pages/AdoptionList";
import Profile from "../pages/MedicationList"
import {ReactComponent as HomeIcon} from '../assets/Home_light.svg'
import {ReactComponent as MedicationIcon} from '../assets/Medication_light.svg'
import {ReactComponent as Adoption} from '../assets/Paw_light.svg'
const routes = [
{
    nome:'Home',
    icon:<HomeIcon />,
    link:'app',
},
{
    nome:'Medication',
    icon:<MedicationIcon />,
    link:'profile',
},
{
    nome:'Adoption',
    icon:<Adoption />,
    link:'about',
},
]
export default routes;