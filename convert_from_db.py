import  json

with open("original_data.json", "r") as fo:
    original_data = json.load(fo)
    new_data = {}
    for i in original_data:
        if i["skill_name"] not in new_data:
            new_data[i["skill_name"]] = {}
        new_data[i["skill_name"]][i["name"]] = i["xp_amount"]
    fw = open("new_data.json", "w")
    fw.write(json.dumps(new_data, indent=4))
    fw.close()

