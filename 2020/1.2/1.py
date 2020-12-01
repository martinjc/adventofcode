with open("input", "r") as input_file:

    nums = [int(n) for n in input_file.readlines()]
    for numA in nums:
        for numB in nums:
            if (2020 - numA - numB) in nums:
                print(numA * numB * (2020 - numA - numB))
                break
