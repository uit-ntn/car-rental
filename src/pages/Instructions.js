import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import "../styles/Instructions.css";

const Instructions = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const showTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Layout>
        </Layout>
    );
}

export default Instructions;
