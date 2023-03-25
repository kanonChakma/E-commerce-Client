# Chronicles

# Top Choice

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


#Table of contents
1. [Description](#description)
2. [Demo](#demo)
3. [API Documentation](#api-documentation)
4. [ERD Visualized](#erd-vis)
5. [Installation and Usage](#installation-usage)
6. [Screenshots](#screenshots)

## Description <a name="description"></a>
full-stack e-commerce based web app, with advance searching functionlaity 

<ins>Features:</ins>
- Responsive layout
- Login(Email and Google) and Sign up(with email confirmaiton)
- Product Rating
- User can see and download their purchase history.
- Coupon code can apply
- Payment with stripe

- Products able to search with :
  - Price
  - Category
  - Rating
  - Subcategory
  - Brands
  - Colors
  - Shipping
  
- Admin able to
  - add products
  - update products
  - delete products
  - add coupon funcionlity
  - multiple image upload
  - add products category
  - add products subcategory

## Demo <a name="demo"></a>

visit at [https://topchoice.netlify.app/](https://topchoice.netlify.app/)


## API Documentation <a name="api-documentation"></a>

- <ins>Users</ins>:

  - `api/user/cart` - POST, GET, DELETE
  - `api/user/address` - POST
  - `api/user/cart/coupon`- POST
  - `api/user/order` - POST, GET
  - `api/user/wishList`- POST, GET
  - `api/user/whisList/:productId` - PUT
  - `api/user/cash-payment` - POST

- <ins>Admin</ins>:
  - `api/admin/orders` - GET
  - `api/admin/order-status` - PUT
  - `api/create-or-update-user` - POST
  - `api/current-admin` - POST
  - `api/current-user` - POST


- <ins>Sub Category</ins>:
  - `api/subs/` - GET
  - `api/sub/`  - POST
  - `api/sub/{slug}` - PUT, DELETE, GET

- <ins>Payment and Coupon</ins>:
  - `api/create-payment-intent` - POST
  - `api/coupon` - POST
  - `api/coupons` - GET
  - `api/coupon/{couponId} - DELETE

- <ins>Products</ins>:
  - `ap/product` - POST
  - `api/product/total` - GET
  - `api/products/{count}` - GET
  - `api/products/` -POST
  - `api/product/{slug}`  - GET, DELETE, PUTT

- <ins>Category</ins>:
  - `ap/categories` - GET
  - `api/category` - POST
  - `api/category/{slug}` - GET, PUT, DELETE
  - `api/subs/{/_id}`  - GET

- <ins>Cloudnary</ins>:
  - `ap/uploadimages` - POST
  - `api/removeimages` - POST
  

## ERD Visualized <a name="erd-vis"></a>

![](readme-res//erd-vis.png)


## ScreenShots <a name="screenshots"></a>

 Home Page                   | Home Page   
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/50201920/198085523-52d8f1f6-f113-4f8e-948a-202205b4c335.png) | ![Log In](https://user-images.githubusercontent.com/50201920/198086446-234aa898-0ab3-4c1d-8c11-f02b73695800.png) 


Shop Page                   | Product Details   
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/50201920/198087357-c56fe426-57d3-4c6b-baa6-63af34258d88.png) | ![Log In](https://user-images.githubusercontent.com/50201920/198087542-449bab5a-373d-45df-bd92-048a1f45f473.png) 

 Order Summary             | Address                   |   Whislist
:-------------------------:|:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/50201920/198088104-9f02c618-f117-4443-9b39-938c9469d5a7.png) | ![Log In](https://user-images.githubusercontent.com/50201920/198088194-484cb616-a097-4e1c-88f9-c232e34f86d8.png) | ![](https://user-images.githubusercontent.com/50201920/198088668-0b1cc877-539d-46b4-bdf6-0d9c37dbe3b5.png)


Admin Dashboard            | Create Product  
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/50201920/198090025-073d96b2-ecb6-4e57-bec2-cf1d237042c3.png) | ![Log In](https://user-images.githubusercontent.com/50201920/198090702-28bbece2-10af-4bb2-aea3-ca2d4878c335.png)


 All products              | Create Category           |   Apply Coupon
:-------------------------:|:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/50201920/198091015-699e8063-0627-4b33-86ad-b3cde6d38807.png) | ![Log In](https://user-images.githubusercontent.com/50201920/198091290-88865f26-8b2b-42d9-bc9b-459449d3e707.png) | ![](https://user-images.githubusercontent.com/50201920/198091427-fe15110c-168a-4b2e-af71-00a9fcae29a3.png)






