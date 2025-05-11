def binary_search(arr,target):
    first = 0
    last = len(arr) - 1
    found = False
    while first <= last and not found:
        midpoint = (first + last) // 2
        if arr[midpoint] == target:
            found = True
        else:
            if target < arr[midpoint]:
                last = midpoint - 1
            else:
                first = midpoint + 1
    return found
# Example usage
if __name__ == "__main__":
    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    target = 5
    result = binary_search(arr, target)
    if result:
        print(f"Element {target} found in the array.")
    else:
        print(f"Element {target} not found in the array.")