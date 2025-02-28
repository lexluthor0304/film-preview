import { Helmet } from "react-helmet";

const GoogleTag = ({ trackingId }) => {
  return (
    <Helmet>
      {/* gtag.js の読み込み */}
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

export default GoogleTag;