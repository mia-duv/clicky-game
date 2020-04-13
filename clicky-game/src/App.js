import React, { Component } from 'react';
import './App.css';
import Wrapper from "./components/Wrapper/Wrapper.js";
import Header from "./components/Header/Header.js";
import Instructions from "./components/Instructions/Instructions.js";
import Navigation from "./components/Navigation/Navigation.js";
import PokemonCard from "./components/Cards/Cards.js";
import pokemon from "./pokemon.json";
import Footer from "./components/Footer/Footer.js";

class App extends Component {
    //State of game score.
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        pokemon: pokemon,
        unselectedPokemon: pokemon
    }

    componentDidMount() {
    }

    //Function for moving images around the screen upon each click.
    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    //Function for scoring in game.
    selectPokemon = pkmn => {
        const findPokemon = this.state.unselectedPokemon.find(item => item.pkmn === pkmn);

        if (findPokemon === undefined) {
            //For when double clicking a Pokemon.
            this.setState({ 
                message: "Already clicked this Pokemon!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                pokemon: pokemon,
                unselectedPokemon: pokemon
            });
        }
        else {
            //For when not double clicking a Pokemon.
            const newPokemon = this.state.unselectedPokemon.filter(item => item.pkmn !== pkmn);
            
            this.setState({ 
                message: "Good! Keep Trying!",
                curScore: this.state.curScore + 1,
                pokemon: pokemon,
                unselectedPokemon: newPokemon
            });
        }

        this.shuffleArray(pokemon);
    };

    
    render() {
        return (
            <Wrapper>
            <Header />
            <Instructions />
            <Navigation
            message={this.state.message}
            curScore={this.state.curScore}
            topScore={this.state.topScore}
            />
            <Wrapper>
            {
                this.state.pokemon.map(pokemon => (
                    <PokemonCard
                        pkmn={pokemon.pkmn}
                        image={pokemon.image}
                        selectPokemon={this.selectPokemon} 
                        curScore={this.state.curScore}
                    />
                ))
            }
            </Wrapper>
            <Footer />
            </Wrapper>
        );
    }
}

export default App;
