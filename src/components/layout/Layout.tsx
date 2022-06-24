import React, {useEffect} from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'

const Layout = (props : any) => {

    const themeReducer = useSelector((state : any) => state.ThemeReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        // const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')
        const themeClass = localStorage.getItem('themeMode')
        // const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')
        const colorClass = localStorage.getItem('colorMode')
        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])

    return (
        <BrowserRouter>
            <Route render={(props : any) => (
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        {/* <TopNav/> */}
                        <div className="layout__content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
