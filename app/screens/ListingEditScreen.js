import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormFields as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import colors from "../config/colors";
import * as Location from "expo-location";
import useLocation from "../hooks/useLocation";
import ListingsApi from "../api/listings";
import { Listings } from "../config/listingsData";
import { values } from "lodash";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image"),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];
function ListingEditScreen({ navigation }) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(1);

  const handleSubmit = (listing, { resetForm }) => {
    // setProgress(0.5);
    setUploadVisible(true);

    // const result = await ListingsApi.addListing({ ...listing, location },progress=>setProgress(progress));

    // if (!result.ok) {
    //   setUploadVisible(false);
    //   return Alert.alert("Could not save the listing");
    // }

    const data = {
      id: Math.random() * 10,
      title: listing.title,
      images: listing.images,
      price: listing.price,
      categoryId: listing.category.value,
      userId: Math.random() * 10,
      location: JSON.stringify(location),
    };

    Listings.unshift(data);
    resetForm();
    // navigation.navigate("Listing");
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen progress={progress} visible={true} />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          //width={120}
        />
        <Picker
          items={categories}
          name="category"
          // numberOfColumns={3}
          //  PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          //width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={2}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
