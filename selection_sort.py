def selection_sort(arr):
    arr = arr.copy()  # Create a copy of the array to avoid modifying the original
    n = len(arr)
    for i in range(n):
        # Assume the minimum is the first element
        min_index = i
        # Test against elements after i to find the smallest
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        # Swap the found minimum element with the first element
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr

# Example usage 
if __name__ == "__main__":
    arr = [64, 25, 12, 22, 11]
    print("Original array:", arr)
    sorted_arr = selection_sort(arr)
    print("Sorted array:", sorted_arr)