import { openDB } from 'idb';

// Function to initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // Create the 'jate' object store with an auto-incrementing key
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Initialize the database and obtain the reference to it
const db = await initdb();

// Function to add content to the database
export const putDb = async (content) => {
  // Create a read-write transaction and access the 'jate' object store
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');

  try {
    // Generate a timestamp for when the content is added
    const timestamp = new Date().getTime();
    // Add the content to the database
    await store.add({ content, timestamp });
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// Function to retrieve all content from the database
export const getDb = async () => {
  // Create a read-only transaction and access the 'jate' object store
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');

  try {
    // Retrieve all content from the 'jate' object store
    const data = await store.getAll();
    console.log('Retrieved content from the database:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return [];
  }
};

// Export the database and the initdb function for potential use in other parts of the application
export { db, initdb };

