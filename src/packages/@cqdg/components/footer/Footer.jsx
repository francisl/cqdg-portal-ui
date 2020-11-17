import React from 'react'
import t from '@cqdg/locales/intl';
import Button from '@ferlab-ui/core/buttons/button';

import './Footer.css';

const Footer = () => {
    return (
        <footer className="nav-footer">
            <div className="footerWrapper">
                <div className="footerTextWrapper">
                    <h3 className="footerTitle">{t('footer.title')}</h3>
                    <p className="footerMoreInfo">{t('footer.info')} <Button defaultIcon={false} href="mailto:support@cqdg.ca">support@cqdg.ca</Button></p>
                </div>
                <div className="footerLogos">
                    <Button href={t('footer.logo.genome.link')} target="_blank" defaultIcon={false}>
                        <img src={`/img/genome_qc_logo_RS_icon.svg`} alt="genome" />
                    </Button>
                    <Button href={t('footer.logo.chusj.link')} target="_blank" defaultIcon={false}>
                        <img src={`/img/chusj_logo_icon.svg`} alt="chusj" />
                    </Button>
                </div>
            </div>
        </footer>
      )
}

export default Footer;
