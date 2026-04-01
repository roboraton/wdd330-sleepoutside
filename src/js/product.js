import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs'; 
import ProductDetails from './ProductDetails.mjs';
import ProductComments from './ProductComments.mjs';

loadHeaderFooter();

const productId = getParam('product');

const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);
product.init();

const reviews = new ProductComments(productId, 'comments-list');
reviews.init();