import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
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

export const fetchFurnitureById = async (id) => {
  const docRef = doc(db, "furnitures", id);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
};

export const updateFurniture = async ({ id, newFurniture }) => {
  const docRef = doc(db, "furnitures", id)
  await updateDoc(docRef, newFurniture);
}

export const deleteFurniture = async (id) => {
  await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this furniture?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your furniture has been removed.",
        icon: "success",
      });
      const docRef = doc(db, "furnitures", id);
      await deleteDoc(docRef);
    }
  });
}

export const updateRoom = async ({id, newRoom}) => {
  const docRef = doc(db, "rooms", id);
  await updateDoc(docRef, newRoom);
}

export const saveRoomDesign = async ({ roomId, currentRoom }) => {
  const roomRef = doc(db, "rooms", roomId);
  await updateDoc(roomRef, currentRoom);
};
