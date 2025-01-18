import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Fetch all rooms
export const fetchAllRooms = async () => {
  try {
    const roomRef = collection(db, "rooms");
    const querySnapshot = await getDocs(roomRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

// Fetch room by ID
export const fetchRoomById = async (id) => {
  try {
    const docRef = doc(db, "rooms", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn(`Room with ID ${id} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    return null;
  }
};

// Fetch all furnitures
export const fetchAllFurnitures = async () => {
  try {
    const furnitureRef = collection(db, "furnitures");
    const querySnapshot = await getDocs(furnitureRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching furnitures:", error);
    return [];
  }
};

// Add furniture to a room
export const addFurnitureToRoom = async ({ roomId, furniture }) => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, { furnitures: arrayUnion(furniture) });
  } catch (error) {
    console.error("Error adding furniture to room:", error);
  }
};

// Save room design
export const saveRoomDesign = async ({ roomId, newRoom }) => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, newRoom);
  } catch (error) {
    console.error("Error saving room design:", error);
  }
};

export const addFavorite = async (furniture) => {
  try {
    await addDoc(collection(db, "favorites"), furniture);
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

// Fetch favorite cards
export const fetchFavorites = async () => {
  try {
    const q = query(collection(db, "favorites"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

// Remove favorite by ID
export const removeFavorite = async (favoriteId) => {
  try {
    await deleteDoc(doc(db, "favorites", favoriteId));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};