import React, { useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages'
import Quiz from './quiz'
import RecentComments from './discuss'
import MyAccount from './MyAccount'
import Parties from './parties'
import FAQ from './faq'
import FAQAdmin from './faqadmin'
import Antrim from './antrimcouncillors'
import AntrimAdmin from './antrimcouncillorsadmin'
import PartiesAdmin from './partiesadmin'
import ProfileAdmin from './profileadmin'
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
import { withAuthenticator, View} from "@aws-amplify/ui-react";

import {Amplify, API, Auth} from 'aws-amplify'
Amplify.configure(aws_exports);

function App({}) {
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
        <Route path='/profile' element = {<MyAccount/>}/>
        <Route path='/discuss' element = {<RecentComments/>}/>
        <Route path='/parties' element = {<Parties/>}/>
        <Route path='/faq' element = {<FAQ/>}/>
        <Route path='/faqadmin' element = {<FAQAdmin/>}/>
        <Route path='/antrimadmin' element = {<AntrimAdmin/>}/>
        <Route path='/partiesadmin' element = {<PartiesAdmin/>}/>
        <Route path='/partiesadmin' element = {<ProfileAdmin/>}/>
      </Routes>
    </Router>
    </View>
  );
}

export default withAuthenticator(App);
