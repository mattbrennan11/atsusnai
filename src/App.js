import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages'
import Quiz from './quiz'
import RecentComments from './discuss'
import Account from './Account'
import Parties from './parties'
import FAQ from './faq' 
import FAQAdmin from './faqadmin'
import Antrim from './antrimcouncillors'
import CouncillorsAdmin from './councillorsadmin'
import PartiesAdmin from './partiesadmin'
import Belfast from './belfastcouncillors'
import Ards from './ardscouncillors'
import Armagh from './armaghcouncillors'
import Ulster from './midulstercouncillors'
import Fermanagh from './fermanaghcouncillors'
import Causeway from './causewaycouncillors'
import Newry from './newrycouncillors'
import MidAntrim from './midantrimcouncillors'
import Lisburn from './lisburncouncillors'
import aws_exports from './aws-exports'
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator, withAuthenticator, View} from "@aws-amplify/ui-react";
import {Amplify} from 'aws-amplify'
Amplify.configure(aws_exports);

function App({user}) {
 
  return (
    
 
    <View className="App">
      <Router> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/quiz' element = {<Quiz/>}/>
        <Route path='/antrim' element = {<Antrim/>}/>
        <Route path='/belfast' element = {<Belfast/>}/>
        <Route path='/ards' element = {<Ards/>}/>
        <Route path='/armagh' element = {<Armagh/>}/>
        <Route path='/ulster' element = {<Ulster/>}/>
        <Route path='/fermanagh' element = {<Fermanagh/>}/>
        <Route path='/causeway' element = {<Causeway/>}/>
        <Route path='/newry' element = {<Newry/>}/>
        <Route path='/midantrim' element = {<MidAntrim/>}/>
        <Route path='/lisburn' element = {<Lisburn/>}/>
        <Route path='/profile' element = {<Account/>}/>
        <Route path='/discuss' element = {<RecentComments/>}/>
        <Route path='/parties' element = {<Parties/>}/>
        <Route path='/faq' element = {<FAQ/>}/>
        <Route path='/faqadmin' element = {<FAQAdmin/>}/>
        <Route path='/councillorsadmin' element = {<CouncillorsAdmin/>}/>
        <Route path='/partiesadmin' element = {<PartiesAdmin/>}/>
      </Routes>
    </Router>
    </View>

);
}

export default withAuthenticator(App);
