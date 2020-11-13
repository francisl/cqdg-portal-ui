import React from 'react';

import IoArrowForward from 'react-icons/lib/io/arrow-right-c';

import t from '@cqdg/locales/intl';
import CountWithIcon from '@cqdg/components/countWithIcon/CountWithIcon'
import CardContainerNotched from '@cqdg/components/cards/CardContainerNotched'
import Button from '@ferlab-ui/core/buttons/button';
import CardContent from '@ferlab-ui/cards/CardContent';

import './home.css';

const HomePage = () => {
  return (
    <main className="home-main">
      <section className="hero">
        <div>
          <div className="description">
            <h2>Le centre québécois de données génomiques</h2>
            <h1>Portail de données</h1>
            <p>Le Centre québécois de données génomiques est une plateforme d'harmonisation et de diffusion des données génomiques générées par les études cliniques et de recherche du Québec.</p>
          </div>
          <div className="buttons">
            <Button>Connexion <IoArrowForward/></Button>
            <Button>Créer un compte</Button>
          </div>
        </div>
        <div className="data">
          <CardContainerNotched>
            <CardContent cardType="header2Column">
              <div className="header">
                <h2>Résumé des donées</h2>
                <span>Publication des donées 3.0 | 7 octobre, 2020</span>
              </div>
              <CountWithIcon count="3" label="Études" iconType="studie" />
              <CountWithIcon count="3" label="Doneurs" iconType="donor" />
              <CountWithIcon count="3" label="Génomes" iconType="genome" />
              <CountWithIcon count="3" label="Exomes" iconType="exome" />
              <CountWithIcon count="3" label="Fichiers" iconType="file" />
              <CountWithIcon count="3" label="TB" iconType="storage" />
            </CardContent>
          </CardContainerNotched>
        </div>
      </section>
      <section className="graphs">
        <CardContainerNotched className="graph">
          <CardContent cardType="stack">
            <h3>Donneurs par type de maladie</h3>
            <img src="/img/horizontal_bar_chart.png" />
          </CardContent>
        </CardContainerNotched>
        <CardContainerNotched className="graph">
          <CardContent cardType="stack">
            <h3>Donneurs par type de maladie</h3>
            <img src="/img/pie_chart.png" />
          </CardContent>
        </CardContainerNotched>
        <CardContainerNotched className="graph">
          <CardContent cardType="stack">
            <h3>Donneurs par type de maladie</h3>
            <img src="/img/bar_chart.png" />
          </CardContent>
        </CardContainerNotched>
      </section>
      <section className="bottom-links">
        <div className="bottom-links-text">
          <h2>Données cliniques et moléculaires harmonisées</h2>
          <p>Les données soumises au portail doivent respecter des formats et des restrictions spécifiques définis dans le dictionnaire de données.</p>
        </div>
        <div className="bottom-links-cards">
          <CardContainerNotched className="card-container">
            <CardContent cardType="stack-center">
              <img src="/img/doc_icon.svg" alt="Cloud Icon" />
              <h3>Donneurs par type de maladie</h3>
              <p>Centre de documentation pour les différents services du CQDG</p>
            </CardContent>
          </CardContainerNotched>
          <CardContainerNotched className="card-container">
            <CardContent cardType="stack-center">
              <img src="/img/data_icon.svg" alt="Cloud Icon" />
              <h3>Donneurs par type de maladie</h3>
              <p>Normes pour le formatage des fichiers de données cliniques</p>
            </CardContent>
          </CardContainerNotched>
          <CardContainerNotched className="card-container">
            <CardContent cardType="stack-center">
              <img src="/img/cloud_icon.svg" alt="Cloud Icon" />
              <h3>Donneurs par type de maladie</h3>
              <p>Guide pour la soumissionde données</p>
            </CardContent>
          </CardContainerNotched>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
