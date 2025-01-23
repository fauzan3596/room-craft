import {
  addDoc,
  query,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

export const addRoom = async (roomData) => {
  const roomRef = collection(db, "rooms");
  const docRef = await addDoc(roomRef, roomData);
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

// export const updateRoom = async ({id, newRoom}) => {
//   const docRef = doc(db, "rooms", id);
//   await updateDoc(docRef, newRoom);
// }

export const deleteRoom = async (id) => {
  await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this room?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your room has been removed.",
        icon: "success",
      });
      const docRef = doc(db, "rooms", id);
      await deleteDoc(docRef);
    }
  });
}

export const saveRoomDesign = async (updatedRoom) => {
  const roomRef = doc(db, "rooms", updatedRoom.id);
  await updateDoc(roomRef, updatedRoom);
};

export const updateFavoriteRoom = async (updatedRoom) => {
  const roomRef = doc(db, "favoriteRooms", updatedRoom.id);
  await updateDoc(roomRef, updatedRoom);
};

export const addRoomToFavorites = async (room) => {
  const docRef = doc(db, "favoriteRooms", room.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    await deleteDoc(docRef);
  } else {
    await setDoc(docRef, room)
  }
}

export const fetchAllFavoriteRooms = async () => {
  const favoriteRoomRef = collection(db, "favoriteRooms");
  let data = [];
  const querySnapshot = await getDocs(favoriteRoomRef);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const fetchAllFavoriteFurnitures = async () => {
  const favoriteFurnitureRef = collection(db, "favorites");
  let data = [];
  const querySnapshot = await getDocs(favoriteFurnitureRef);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const fetchRoomTemplates = async () => {
  const docRef = collection(db, "roomTemplates");
  let data = [];
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const addTemplate = async (roomData) => {
  const docRef = doc(db, "rooms", roomData.id)
  await setDoc(docRef, roomData)
};

export const addFavorite = async (furniture) => {
  console.log(furniture)
  try {
    await setDoc(doc(db, "favorites", furniture.id), furniture);
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

export const fetchFavorites = async () => {
  try {
    const q = query(collection(db, "favorites"));
    const data = []
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    })

    return data
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

export const removeFavorite = async (favoriteId) => {
  try {
    await deleteDoc(doc(db, "favorites", favoriteId));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};

export const fetchFurnitureById = async (id) => {
  try {
    const docRef = doc(db, "furnitures", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn(`Furniture with ID ${id} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching furniture by ID:", error);
    return null;
  }
}