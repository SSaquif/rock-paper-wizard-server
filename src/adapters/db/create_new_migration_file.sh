#!/bin/bash

# Check if filename is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <migration_filename> [destination_directory]"
  exit 1
fi

filename_input="$1"

# Get the directory where this script is located
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define migrations directory
migrations_dir="$script_dir/migrations"

# Check if migrations directory exists
if [ ! -d "$migrations_dir" ]; then
  echo "Migrations directory does not exist: $migrations_dir"
  exit 1
fi

# Generate timestamp
timestamp=$(date +%Y%m%d%H%M%S)

# Construct full file path
final_filename="${timestamp}_${filename_input}.ts"
full_path="${migrations_dir}/${final_filename}"

# Create the file
touch "$full_path"

echo "Migration file created: $full_path"


