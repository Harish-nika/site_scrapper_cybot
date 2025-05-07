import pandas as pd
import subprocess
import os

# Path to your CSV file
csv_path = '/home/harish/Project_works/pdf_printer_chromium/urls.csv'

# Path to your shell script and JS file
shell_script_path = '/home/harish/Project_works/pdf_printer_chromium/html2pdf.sh'
js_script_path = '/home/harish/Project_works/pdf_printer_chromium/Automated_human_pranker.js'

# Read the CSV
df = pd.read_csv(csv_path)

# Ensure column 'url' exists
if 'url' not in df.columns:
    raise ValueError("CSV file must contain a 'url' column")

# Iterate over the URLs and generate PDF
for i, row in df.iterrows():
    url = row['url']
    output_pdf_path = f"/home/harish/Project_works/pdf_printer_chromium/pdf_outputs/output_{i+1}.pdf"

    # Replace URL and PDF path in the JS file dynamically
    with open(js_script_path, 'r') as file:
        js_code = file.read()

    js_code = js_code.replace(
        "https://www.sec.gov/Archives/edgar/data/927971/000121465925006084/b417252fwp.htm", url
    ).replace(
        "/home/harish/Project_works/pdf_printer_chromium/p2.pdf", output_pdf_path
    )

    # Write the modified JS to a temp file
    temp_js_path = "/tmp/temp_automated_pranker.js"
    with open(temp_js_path, 'w') as file:
        file.write(js_code)

    # Run the shell script and JS using subprocess
    subprocess.run(['chmod', '+x', shell_script_path])
    subprocess.run([shell_script_path])
    subprocess.run(['node', temp_js_path])

print("All URLs processed and PDFs saved.")
