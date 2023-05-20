import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseDOM } from 'htmlparser2';

import {
  CardRepo,
  CardRepoInfo,
  ContactMe, Container, Content, GitRepos, ImageContainer, Profile, Skills, Stacks,
} from './styles';

export default function Home() {
  const [repositories, setRepositories] = useState([]);

  const token = process.env?.REACT_APP_GITHUB_TOKEN || null;

  const fetchRepositories = async () => {
    try {
      const response = !token
        ? await axios.get('https://api.github.com/users/Birgiman/repos')
        : await axios.get('https://api.github.com/users/Birgiman/repos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      const filteredRepositories = response.data.filter((repo) => repo.topics.includes('website-repo'));

      const repositoriesWithCoverImage = await Promise.allSettled(
        filteredRepositories.map(async (repo) => {
          if (!repo.contents_url) {
            return repo;
          }

          const readmeUrl = repo.contents_url.replace('{+path}', 'README.md');
          const readmeResponse = await axios.get(readmeUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const readmeContentBase64 = readmeResponse.data.content;

          const dom = parseDOM(readmeContentBase64);
          const decodedString = atob(dom[0].data);

          const parser = new DOMParser();
          const doc = parser.parseFromString(decodedString, 'text/html');
          const contentToFilter = doc.all;

          let coverImage = '';

          if (contentToFilter.length > 0) {
            const imgTags = Array.from(contentToFilter).filter((node) => node.id === 'cover-image');
            if (imgTags.length > 0) {
              coverImage = imgTags[0].getAttribute('src') || '';
            }
          }

          let stacks = '';

          if (contentToFilter.length > 0) {
            const liTags = Array.from(contentToFilter).filter((node) => node.id === 'frontend-stack');
            if (liTags.length > 0) {
              stacks = liTags[0].getElementsByTagName('li') || '';
            }
          }

          return {
            ...repo,
            coverImage,
            stacks,
          };
        }),
      );

      const resolvedRepositories = repositoriesWithCoverImage
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);

      setRepositories(resolvedRepositories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const firstRepo = repositories[0];

  return (
    <Container>
      <Content>

        {repositories ? (
          <>
            <Profile>
              {firstRepo && (
              <>
                <img src={firstRepo.owner.avatar_url} alt={firstRepo.owner.login} />
                <h2>Eduardo Birgiman</h2>
                <span>Desenvolvedor Front-End com foco em React.js e novas tecnologias!</span>
              </>
              )}
            </Profile>
            <Skills>
              <>
                <p>Minhas habilidades:</p>
                <span>JavaScript</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>Docker</span>
                <span>React</span>
                <span>React-Native</span>
                <span>Styled-Components</span>
                <span>HTML</span>
                <span>CSS</span>
              </>
            </Skills>
            <GitRepos>
              <p>Meus portifólios:</p>
              {repositories.length > 0 ? (
                <CardRepo>
                  {repositories.map((repo) => (
                    <CardRepoInfo key={repo.id} className="cardrepoINFO">
                      <span>{repo.name}</span>
                      <div className="content">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <ImageContainer>
                            <img src={repo.coverImage} alt={repo.name} />
                          </ImageContainer>
                          <p>{repo.description}</p>
                        </a>
                        {repo.stacks ? (
                          <Stacks>
                            {Array.from(repo.stacks).map((stack) => (
                              <span key={stack.innerText}>{stack.innerText}</span>
                            ))}
                          </Stacks>
                        ) : (
                          <Stacks>
                            <span>Tecnologia não informada.</span>
                          </Stacks>
                        )}
                      </div>
                      {console.log({ repo })}
                    </CardRepoInfo>
                  ))}
                </CardRepo>
              ) : (
                <p>Carregando...</p>
              )}
            </GitRepos>
            <ContactMe>Minhas Redes:</ContactMe>
          </>
        ) : (
          <h2>Carregando...</h2>
        )}

      </Content>
    </Container>
  );
}
