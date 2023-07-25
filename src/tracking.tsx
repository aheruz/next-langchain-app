import Script from 'next/script'
import { env } from 'process'
 
export function GoogleTagManager() {
    const GA_MEASUREMENT_ID = env.GA_MEASUREMENT_ID ? env.GA_MEASUREMENT_ID : ""

    if (GA_MEASUREMENT_ID.length > 0) {
        return (
            <>
                <Script src={"https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID}/>
                <Script id="google-analytics">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', '${GA_MEASUREMENT_ID}');
                    `}
                </Script>
            </>
        )
    }
    return null
}
