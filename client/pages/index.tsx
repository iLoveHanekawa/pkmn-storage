import { Grid } from '../components/Grid';
import { HeroText } from '../components/HeroText';
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className = 'font-nunito'>
      <HeroText/>
      <Grid/>
    </div>
  )
}
