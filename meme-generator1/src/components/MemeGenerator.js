import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topText: "",
            imgNumber: -1,
            bottomText: "",
            numberText: "",
            randomImg: "https://i.imgflip.com/1ur9b0.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handlePreviousClick = this.handlePreviousClick.bind(this)
        this.getNameAndUrl = this.getNameAndUrl.bind(this)
        this.handleChangeNumber = this.handleChangeNumber.bind(this)
        this.handleRandomClick = this.handleRandomClick.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs: memes})
            })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })        
    }

    handleChangeNumber(event) {
        const {name, value} = event.target
        if (parseInt(value) > 99) {
            return
        }

        if (value === "") {
            this.setState({
                [name]: "",
                imgNumber: 0                
            },this.handleClick)
        } else {
            this.setState({
                [name]: value,
                imgNumber: parseInt(value)
            }, this.handleClick)
        }
    }

    handleClick() {        
        const randMemeImg = this.state.allMemeImgs[this.state.imgNumber].url
        this.setState({ randomImg: randMemeImg })
    }

    handleRandomClick(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)        
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ 
            randomImg: randMemeImg,
            imgNumber: randNum, 
            numberText: randNum,
        })
    }

    handleNextClick(event) {
        event.preventDefault()
        if (this.state.imgNumber === 99) {
            return
        }

        if (this.state.imgNumber === - 1) {
            this.setState({
                imgNumber: 0
            }, this.handleClick)
            return
        }

        this.setState({
            imgNumber: this.state.imgNumber + 1,
            numberText: this.state.imgNumber + 1
        }, this.handleClick)
    }
    
    handlePreviousClick(event) {
        event.preventDefault()
        if (this.state.imgNumber === 0) {
            return
        }  
        
        if (this.state.imgNumber === - 1) {
            this.setState({
                imgNumber: 0
            }, this.handleClick)
            return
        }
        this.setState({
            imgNumber: this.state.imgNumber - 1,
            numberText: this.state.imgNumber - 1
        }, this.handleClick)

    }

    getNameAndUrl() {
        if (this.state.imgNumber === -1) {            
            return
        } else {             
            return (
                <div>
                    <p className="meme-form">Name:{this.state.allMemeImgs[this.state.imgNumber].name} </p>
                    <p className="meme-form">Url: {this.state.allMemeImgs[this.state.imgNumber].url} </p>
                    <p className="meme-form">Width: {this.state.allMemeImgs[this.state.imgNumber].width} </p>
                    <p className="meme-form">Height: {this.state.allMemeImgs[this.state.imgNumber].height} </p>
                    <p className="meme-form">Image number: {this.state.imgNumber} </p>

                </div>            
                                    
            )
        }
        
    }

    render() {
        return (
            <div>
                <form className="meme-form" >
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />                     
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="BottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />                     
                                      
                </form>
                <form className="meme-form" >
                    <input 
                        type="text"
                        name="numberText"
                        placeholder="Chose the number of the image"
                        value={this.state.numberText}
                        onChange={this.handleChangeNumber}
                        
                    />  
                    <button onClick={this.handlePreviousClick}>Previous</button>  
                    <button onClick={this.handleNextClick}>Next</button>  
                     <button onClick={this.handleRandomClick}>Random</button>             
                       
                </form>

                <div>
                    {this.getNameAndUrl()} 
                </div>
                
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }

}


export default MemeGenerator



