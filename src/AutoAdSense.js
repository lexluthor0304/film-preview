// AutoAdSense.js
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AutoAdSense = ({ client }) => {
  useEffect(() => {
    if (window.adsbygoogle && !window.adsbygoogle.__hasPushed) {
      try {
        window.adsbygoogle.push({});
        window.adsbygoogle.__hasPushed = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <Helmet>
      <script
        async
        data-ad-client={client}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossorigin="anonymous"
      ></script>
    </Helmet>
  );
};

export default AutoAdSense;