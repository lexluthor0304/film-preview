import { useEffect } from "react";
import { Helmet } from "react-helmet";

const AutoAdSense = ({ client }) => {
  useEffect(() => {
    // 确保 Google Ads 代码已经加载
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
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