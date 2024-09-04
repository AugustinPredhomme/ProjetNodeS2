module.exports = {
    preset: 'ts-jest', // Utiliser ts-jest pour la compatibilité TypeScript
    testEnvironment: 'node', // Spécifie l'environnement de test pour Node.js
    testMatch: ['**/__tests__/**/*.test.ts'], // Correspond aux fichiers de test
    setupFiles: ['<rootDir>/jest.setup.ts'], // Fichiers à exécuter avant les tests
  };