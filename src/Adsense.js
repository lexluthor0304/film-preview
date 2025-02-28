// Adsense.js
import React, { useEffect } from 'react';

const Adsense = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-广告客户ID"
      data-ad-slot="广告位ID"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  );
};

export default Adsense;