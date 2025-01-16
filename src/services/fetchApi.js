import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

export const addRoom = async (roomData) => {
  const roomRef = collection(db, "rooms");
  const docRef = await addDoc(roomRef, roomData);
  if (docRef) {
    Swal.fire({
      title: "Success",
      text: "New room added successfully",
      icon: "success",
    });
  }
};

export const fetchAllRooms = async () => {
  const roomRef = collection(db, "rooms");
  let data = [];
  const querySnapshot = await getDocs(roomRef);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const fetchRoomById = async (id) => {
  const docRef = doc(db, "rooms", id);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
};

export const addFurniture = async (furnitureData) => {
  const furnitureRef = collection(db, "furnitures");
  const docRef = await addDoc(furnitureRef, furnitureData);
  if (docRef) {
    Swal.fire({
      title: "Success",
      text: "New furniture added successfully",
      icon: "success",
    });
  }
};

export const fetchAllFurnitures = async () => {
  const furnitureRef = collection(db, "furnitures");
  let data = [];
  const querySnapshot = await getDocs(furnitureRef);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

  export const addFurnitureToRoom = async ({ roomId, furniture }) => {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, { furnitures: arrayUnion(furniture) });
  };

  export const saveRoomDesign = async ({ roomId, newRoom }) => {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, newRoom);
  };
