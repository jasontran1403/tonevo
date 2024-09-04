import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";

const App = () => (
  <TonConnectUIProvider
      manifestUrl="http://localhost:5173/tonconnect-manifest.json"
      uiPreferences={{theme: THEME.LIGHT}}
      walletsListConfiguration={{
        includeWallets: []
      }}
      actionsConfiguration={{
        twaReturnUrl: 'http://localhost:5173/dashboard'
      }}
    >
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Business />
          <Billing />
          <CardDeal />
          <Testimonials />
          <Clients />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  </TonConnectUIProvider>
);

export default App;
