import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const SHOPIFY_SCRIPT_ID = 'shopify-buy-button-js';
const SHOPIFY_SCRIPT_URL =
    'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

const SHOPIFY_DOMAIN = '3d97a8-fb.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = '787e2ef44b98115a0a846c1b274faeee';
const SHOPIFY_COLLECTION_ID = '448487784687';

const shopifyBuyOptions: any = {
    product: {
        styles: {
            product: {
                '@media (min-width: 601px)': {
                    'max-width': 'calc(25% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '50px',
                    width: 'calc(25% - 20px)',
                },
            },
        },
        text: {
            button: 'Add to cart',
        },
    },
    productSet: {
        styles: {
            products: {
                '@media (min-width: 601px)': {
                    'margin-left': '-20px',
                },
            },
        },
    },
    modalProduct: {
        contents: {
            img: false,
            imgWithCarousel: true,
            button: false,
            buttonWithQuantity: true,
        },
        styles: {
            product: {
                '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                },
            },
        },
        text: {
            button: 'Add to cart',
        },
    },
    option: {},
    cart: {
        text: {
            total: 'Subtotal',
            button: 'Checkout',
        },
    },
    toggle: {},
};

export const ShopifyCollection: React.FC = () => {
    useEffect(() => {
        // Dynamically load the Shopify Buy Button script if not already present.
        function loadShopifyScript(): Promise<void> {
            return new Promise((resolve) => {
                const existingScript = document.getElementById(SHOPIFY_SCRIPT_ID);
                if (existingScript) {
                    // Script already in the page
                    resolve();
                } else {
                    // Create script tag
                    const script = document.createElement('script');
                    script.id = SHOPIFY_SCRIPT_ID;
                    script.src = SHOPIFY_SCRIPT_URL;
                    script.async = true;
                    script.onload = () => resolve();
                    document.head.appendChild(script);
                }
            });
        }

        // Once the script is loaded, initialize the ShopifyBuy UI
        function initShopifyBuy() {
            const w = window as any;
            if (!w.ShopifyBuy) return;

            const client = w.ShopifyBuy.buildClient({
                domain: SHOPIFY_DOMAIN,
                storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
            });

            w.ShopifyBuy.UI.onReady(client).then((ui: any) => {
                const container = document.getElementById('collection-component-12345');
                if (container) {
                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
                }

                ui.createComponent('collection', {
                    id: SHOPIFY_COLLECTION_ID,
                    node: document.getElementById('collection-component-12345')!,
                    moneyFormat: '%24%7B%7Bamount%7D%7D',
                    options: shopifyBuyOptions,
                });
            });
        }

        loadShopifyScript().then(() => {
            if ((window as any).ShopifyBuy && (window as any).ShopifyBuy.UI) {
                initShopifyBuy();
            } else {
                setTimeout(initShopifyBuy, 100);
            }
        });
    }, []);

    return (
        <Container className='mt-5 text-center'>
            <h1 className='my-3'>Shop AME Merch</h1>
            <div id="collection-component-12345"></div>
        </Container>
    );
};
