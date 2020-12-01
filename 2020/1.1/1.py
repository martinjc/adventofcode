with open("input", "r") as input_file:

    nums = [int(n) for n in input_file.readlines()]
    for num in nums:
        if (2020 - num) in nums:
            print(num * (2020 - num))
            break
