import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from "./GoalItem";
import GoalInput from "./GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [...courseGoals, {uid: Math.random().toString(), value: goalTitle}])
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.uid !== goalId)
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} visible={isAddMode} />
      <FlatList
          keyExtractor={(item, index) => item.uid}
          data={courseGoals}
          renderItem={itemData => (
            <GoalItem onDelete={() => removeGoalHandler(itemData.item.uid)} title={itemData.item.value} />
          )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
})
