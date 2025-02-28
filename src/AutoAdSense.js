import { useEffect } from "react";

const AutoAdSense = ({ client }) => {
  useEffect(() => {
    // 检查是否已经加载过 AdSense 脚本，避免重复加载
    if (!document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("data-ad-client", client);
      document.body.appendChild(script);
    }
  }, [client]);

  return (
    <>
      {/* React 19 直接支持 <meta> 等 HTML 元数据 */}
      <meta name="google-adsense-client" content={client} />
    </>
  );
};

export default AutoAdSense;