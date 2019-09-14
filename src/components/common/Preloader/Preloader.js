import React from 'react'
import preloader from '../../../assets/img/loading.gif'

let Preloader = (props) => {
	return <div style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
		<img src={preloader} alt="Prloader"/>
	</div>
}

export default Preloader