# Setup and Installation Instructions for the Share Elhayat Application

## Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Install [npm](https://www.npmjs.com/) (Node Package Manager), which comes with Node.js.

## Installation Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pepoeljokr/share-elhayat.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd share-elhayat
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Environment Configuration**:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Customize the configuration in the `.env` file according to your environment.

5. **Build the Application**:
   ```bash
   npm run build
   ```

6. **Run the Application**:
   ```bash
   npm start
   ```

## Additional Information
- For running tests, use:
   ```bash
   npm test
   ```
- For further documentation, check the [Wiki](https://github.com/Pepoeljokr/share-elhayat/wiki).

## Troubleshooting
- If you encounter any issues during setup, please refer to the [issues section](https://github.com/Pepoeljokr/share-elhayat/issues) of the repository for help or to report bugs.