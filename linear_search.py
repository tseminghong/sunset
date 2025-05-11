def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1
# Example usage
if __name__ == "__main__":
    arr = [5, 3, 8, 6, 2]
    target = 6
    result = linear_search(arr, target)
    if result != -1:
        print(f"Element found at index: {result}")
    else:
        print("Element not found in the array.")