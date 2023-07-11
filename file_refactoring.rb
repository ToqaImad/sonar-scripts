# Arguments
folder = ARGV[0]
saving_path_dir = ARGV[1]
​
# Methods
def files_refactoring(folder, saving_path_dir)
  Dir.foreach(folder) do |file|
    if file.end_with?('.txt')
       new_dir_name = file.split("-").first
       language_folder = File.join(saving_path_dir, new_dir_name)
       Dir.mkdir(language_folder) unless Dir.exist?(language_folder)
       File.rename(File.join(folder, file), File.join(language_folder, file))
    end  
  end
end    
​
# method call
files_refactoring(folder, saving_path_dir)