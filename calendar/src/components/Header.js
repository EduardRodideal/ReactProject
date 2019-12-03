import React, {Component} from 'react'
import Month from './Month'
import Year from './Year'
import RingLeft from './RingLeft'
import RingRight from './RingRight'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
                <Month />
                <Year />
                <RingLeft />
                <RingRight />
                <LeftArrow />
                <RightArrow />
            </div>
        )
    }
}


export default Header