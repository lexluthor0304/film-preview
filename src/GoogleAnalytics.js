import { Helmet } from "react-helmet";

const GoogleAnalytics = ({ trackingId }) => {
  return (
    <Helmet>
      {/* Google Analytics 4 (GA4) 代码 */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics;