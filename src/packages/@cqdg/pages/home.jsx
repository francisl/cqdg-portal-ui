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
      <div className="contentWrapper">
        <section className="hero">
          <div>
            <div className="description">
              <h2>{t('home.hero.subtitle')}</h2>
              <h1>{t('home.hero.title')}</h1>
              <p>{t('home.hero.text')}</p>
            </div>
            <div className="buttons">
              <Button>{t('home.hero.buttons.connection')} <IoArrowForward/></Button>
              <Button>{t('home.hero.buttons.account')}</Button>
            </div>
          </div>
          <div className="data">
            <CardContainerNotched>
              <CardContent cardType="header2Column">
                <div className="header">
                  <h2>{t('home.hero.data.header')}</h2>
                  <span>{t('home.hero.data.subtitle')}</span>
                </div>
                <CountWithIcon count="3" label={t('home.hero.data.groups.study')} iconType="study" />
                <CountWithIcon count="3" label={t('home.hero.data.groups.donor')} iconType="donor" />
                <CountWithIcon count="3" label={t('home.hero.data.groups.genome')} iconType="genome" />
                <CountWithIcon count="3" label={t('home.hero.data.groups.exome')} iconType="exome" />
                <CountWithIcon count="3" label={t('home.hero.data.groups.file')} iconType="file" />
                <CountWithIcon count="3" label={t('home.hero.data.groups.size')} iconType="storage" />
              </CardContent>
            </CardContainerNotched>
          </div>
        </section>
        <section className="graphs">
          <CardContainerNotched type="hovered" className="graph">
            <CardContent cardType="stack">
              <h3>{t('home.graphs.graph1.title')}</h3>
              <img src="/img/horizontal_bar_chart.png" />
            </CardContent>
          </CardContainerNotched>
          <CardContainerNotched type="hovered" className="graph">
            <CardContent cardType="stack">
              <h3>{t('home.graphs.graph2.title')}</h3>
              <img src="/img/pie_chart.png" />
            </CardContent>
          </CardContainerNotched>
          <CardContainerNotched type="hovered" className="graph">
            <CardContent cardType="stack">
              <h3>{t('home.graphs.graph3.title')}</h3>
              <img src="/img/bar_chart.png" />
            </CardContent>
          </CardContainerNotched>
        </section>
        <section className="bottom-links">
          <div className="bottom-links-text">
            <h2>{t('home.cards.text.block.title')}</h2>
            <p>{t('home.cards.text.block.text')}</p>
          </div>
          <div className="bottom-links-cards">
            <a target="_blank" href="https://docs.qa.cqdg.ferlab.bio/">
              <CardContainerNotched type="hover" className="card-container">
                <CardContent cardType="stack-center">
                  <img src="/img/doc_icon.svg" alt="Cloud Icon" />
                  <h3>{t('home.cards.card1.title')}</h3>
                  <p>{t('home.cards.card1.text')}</p>
                </CardContent>
              </CardContainerNotched>
            </a>
            <a target="_blank" href="https://docs.qa.cqdg.ferlab.bio/dictionary/">
              <CardContainerNotched type="hover" className="card-container">
                <CardContent cardType="stack-center">
                  <img src="/img/data_icon.svg" alt="Cloud Icon" />
                  <h3>{t('home.cards.card2.title')}</h3>
                  <p>{t('home.cards.card2.text')}</p>
                </CardContent>
              </CardContainerNotched>
            </a>
            <a target="_blank" href="https://docs.qa.cqdg.ferlab.bio/docs/submission/submitting-clinical-data/">
              <CardContainerNotched type="hover" className="card-container">
                <CardContent cardType="stack-center">
                  <img src="/img/cloud_icon.svg" alt="Cloud Icon" />
                  <h3>{t('home.cards.card3.title')}</h3>
                  <p>{t('home.cards.card3.text')}</p>
                </CardContent>
              </CardContainerNotched>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
