import React, { useState } from "react";
import {Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import Post from "./Post";

const Posts = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  // TODO add your code   
  const [allPosts, setAllPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterTxt, setFilterTxt]= useState([]);
  const handleFecth = async () => {
    try {
      setIsLoading(true);
    const response = await fetch(url)
    const data = await response.json();
    setAllPosts(data);
    console.log(data)
    setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }
  const filterPosts = (e) => {
    let newArray = [...allPosts];
    let searchInput = e
    console.log(e)
    let filteredPosts = newArray.filter(post => {
      return post.title.toLowerCase().includes(searchInput.toLowerCase())
    }
    )
    setFilterTxt(filteredPosts)
    
  }
  return (
    <SafeAreaView style={styles.root}> 
            {!allPosts &&  
                    <TouchableOpacity onPress={handleFecth}
                        activeOpacity={0.7} >
                        <View style={styles.btn}>           
                            <Text style={styles.btnTxt} > Load Posts </Text> 
                        </View>        
                            {isLoading &&         
                        <ActivityIndicator size="small" color="#000" />        
                            }
                    </TouchableOpacity>      
                    }
    <View>      
                {allPosts &&     
        <View style={styles.searchBox} >         
            <View>            
                <Text> Search:  </Text>          
            </View>        
            <View style={styles.inputBox} >            
                        <TextInput style={styles.input} onChangeText={(e) => filterPosts(e)}/>          
            </View>        
        </View>        
        }
            
            {filterTxt.length === 0 ?         
            allPosts?.map(el =>   
            <Post key={el?.id}  title={el?.title} body={el?.body} id={2}  />    
                    )
            : filterTxt.map(el =>   
            <Post key={el?.id}  title={el?.title} body={el?.body} id={2}  />    
                    )
            }
    </View>    
</SafeAreaView>  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  btn: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5  },
  btnTxt: {
    color: "#fff",
    textAlign: "center",
  },  
  inputBox: {
  borderColor: 'red',
  boderWidth: 3,
  padding: 10},
input: {
  borderColor: 'red',
  boderWidth: 3,
  padding: 10,
      backgroundColor: "#f7f7f7",
  borderRadius: 5},
  searchBox: {
    flexDirection: 'row',
    alignItems: "center"  }
})
export default Posts;
