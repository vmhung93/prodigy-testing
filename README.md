# Prodigy testing

## Description
This is source code of simple app for an online shopping festival.

You need to register and login before using this system. There are two roles in this system (admin and user). By default, when you registered successfully, you are a manual user. You can upgrade your permissions to be an admin. Normally this would be handled by the main admin or another admin who has permission to do that, but for simplicity I have an api that allows you to do it yourself.

As an admin, you can create, update and product statistics (most viewed, most listed).

As a user, you can list, search for products, and track how many people view products. Also you can add/remove products to wishlist.

Regarding the feature of counting the product view, I didn't increase this number automatically when user retrieve product from api. I assume that the FE will send a request to increase number of view after user retrieves and reads the information of product. That will be the actual number of people actually viewing the product.

Regarding the feature of uploading product images, I have an api to upload the images, it will return the image url, so when the admin creates a new product, just use the image url instead of the image file.

## Technical

In this test, I use NestJS, which is a Node.js framework that supports TypeScript.

- mongoose for connecting MongoDB
- multer for uploading files.
- passport for authentication/authorization
- winston for logging
- class-validator for validation

For your information about [NestJS](https://github.com/nestjs/nest) 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API documentation
I have applied swagger,so you can easily access by link: http://localhost:3000/swagger

### Users
| Method | Endpoint | Describe |
| ------ | ------ | ------ |
| GET | /users | List of users |
| GET | /users/profile | Retrieve the information of current user |
| PUT | /users/upgrade-permission | Grant admin permission to an user |

### Authentication
| Method | Endpoint | Describe |
| ------ | ------ | ------ |
| POST | /auth/login | Login to system |
| POST | /auth/sign-up | Register to a new user |

### Products
| Method | Endpoint | Describe |
| ------ | ------ | ------ |
| GET | /products | Search products |
| POST | /products | Create a new product |
| PUT | /products | Update product information |
| GET | /products/{id} | Get a product by id |
| GET | /products/most-viewed | Get most viewed product |
| PUT | /products/view/{id} | Increase product views |

### Wish List
| Method | Endpoint | Describe |
| ------ | ------ | ------ |
| GET| /wishlist | Get wish list of current user |
| GET| /wishlist/most-listed | Get most listed product |
| POST| /wishlist/{productId} | Add a product to wish list |
| DELETE| /wishlist/{productId} | Remove a product to wish list |

 ### Resource
| Method | Endpoint | Describe |
| ------ | ------ | ------ |
| POST | /resources/images| Upload images |
| GET | /resources/images/{imageId} | Get image by image id |


## Should be improved

- Apply validation for product (check the product is existing or not) when add to wishlist
- Apply unit testing
- Apply docker
