# TestShop Automation Framework

## Overview
This project contains automated tests for an e-commerce web application, built with TypeScript to ensure quality and functionality of the online shopping experience.

## Technologies
- TypeScript
- Selenium WebDriver 
- Page Object Model design pattern

## Features
- End-to-end tests for critical user flows:
  - User registration and login
  - Product search and filtering
  - Shopping cart functionality
  - Checkout process
- Cross-browser testing capability
- Reporting integration

## Project Structure


testshop/
├── config/
│   └── config.ts
├── pages/
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
├── tests/
│   ├── login.test.ts
│   ├── search.test.ts
│   └── checkout.test.ts
├── utils/
│   ├── reporter.ts
│   └── helper.ts
└── package.json

## Setup Instructions
1. Clone this repository
2. Install dependencies: `npm install`
3. Configure test environment in `config/config.ts`

## Running Tests
- Run all tests: `npm test`
- Run specific test suite: `npm test -- --suite login`
- Run in specific browser: `npm test -- --browser chrome`

## Sample Test Results
