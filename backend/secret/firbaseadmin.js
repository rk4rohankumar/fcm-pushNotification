import admin from 'firebase-admin';

const serviceAccount = {
    "type": "service_account",
    "project_id": "emoha-67fa4",
    "private_key_id": "518dc1d4fd27fad307902fbe8de9cd0882301faf",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDO1gXJm7AptGk7\nb/rEU415xovEfTd8dRBihZAWpBcgJEVcepJli0L2io36IbgQhOFvZldY/ZXLDW3A\nAHGH41+TtL0+NsmjereDAz5L1rwAeVXUJtl53/f58XcDL6J/IzdUJ29bFNj0go70\nB37519zZmnhtiDh1D+2vpW5HTZvTSNGd5q+mdveiJuKyqv5fJXHTIsk6BJcBC60U\nqHDn19NFCFx43iqWlyrGss/tgYSG8jdp1KK8hr+Cjd2HHu18nHBM/u1f8zmYffU1\nwQm8gdh2EXA6UePSrl445Tr2fUmejvgWANrtL0VOOzKHJPhR+vn5R/iZ2PhI/Txx\npgZXwWEHAgMBAAECggEAAaxHaA2IPHUTi8eHOMQr5PMLCjFi05fst+pqjz7BvwqM\nEDTRxXKT9UvvKr8d2zwAQ1GJo1QyGwRus7D0Lv+g2yXcfdI+wV1+IUdpnF0qA/LK\nxeLHxn5TAcHXzD4akPqauVp8egGDP7nULi13mtjdLEQESNNjU5oy8fddoHYEadwy\n7ZZVYKBrc2JZEEm9G1Np636IP5YnfX+82nJZ1HGaDUa05G0zwURAkK2+mvEhAcvt\n1tbACkVzaYDw2ciHPosL7fD+ynRSNWcp8ytss7eB4sa6g2bSuUTbXARYb+L7H/Md\nuJLIPT4ifrB/0ElyF7H3rNg9dSOnrJNr0FaZxDiFAQKBgQD4YznaSE2gbZSOvw3r\n9MgXCnmnLyiauzJeDZzXWmXK8nJfpUhv9+nuL19/yT2IOIQE1cd6fdCVFLnSjZcW\nRL4+BkON+RbJa7pHY5oCLtQL064tuvqvIA5gt98SftJowqNgLZ2DvwSU5D2drUM4\nPRCHXft5wGEFHiqok0kLiweh8wKBgQDVLMunVv6NeSmLdJymepNDH0mX3US/C0LW\n4B9fLItIsk23nin3fuzbIjhyPu9Dy+DvZNEO5AnuICKyJF8HimpFyeWaClBGhfhm\npY/pD1dwp6Jij34+D2JKWjIIhfmMzE7RbC0x4IF+NdCdNNJ9rtbuJBMcVeha3ee5\nBi8c4XV1nQKBgGIRMx82msdzXEr7rbByZamLLjrOyLZGoH033Ku9+iCllnii1jW2\n6PpsY8UdHBkzTxRlnyuCjx69Hxy9YGCfZYkxiex84v1FdjeHYJ/qAzhkLAnMH/uS\nqXqQPhecUNChwEVR3TXN7i4m6xjc9oQ2v9biSU5poSSXI3qJJDbVfn73AoGBAIL9\nvrq6QzsNu9CcvHG0Gm+Bd0hhSBAYzF6bY8uo5IGsRwNQpjsV/Fd/RK43K/E+A583\nFRuQVuXDS26p2NcaX8k4keTA96kOQ6BXlgHBUpq/95GW2R0reNt1Zw9DvB+fn8Mi\nNPdUHF5AlUs0nS9r01iMRE4CIABOIUjZmvOlOvclAoGAVjngbBAuxx6kHDS8ToZw\n8IuyjOAxRhPEnu05tJ6C2/jOUKLuhkgERFCVTZrr7h+aMn1tisXUVk0hjOalCfUI\nyev88K5RgOYmgzDuPhnnmtCR4OUI9bT4wErrhKijcWGSGaVFXdKC5plaJkqeKERP\naLfsRIUWiY5r5rTyXEiEepU=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-n2cf2@emoha-67fa4.iam.gserviceaccount.com",
    "client_id": "112875350864961987571",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n2cf2%40emoha-67fa4.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  

export const initAdmin=()=> admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

export const getAdmin=()=>admin;